import { useCallback, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import useProductTypeStore, { ProductType } from '@/store/productTypeStore'

import { Button } from "@/components/ui/button"
import { PATCH_productTypeOrder } from '@/http/fetchApi/orderApi'

const OrderItem = ({ typeData, index, moveCard }:
  {
    typeData: ProductType,
    index: number,
    moveCard: (sIdx: number, eIdx: number) => void
  }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "Card",

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()!,
      }

    },
    hover(item: (ProductType & { index: number } | unknown), monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = (item as ProductType & { index: number }).index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = (ref.current as HTMLElement)?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      if ((item as ProductType).isPresented === '1') {
        moveCard(dragIndex, hoverIndex);
      }

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      (item as ProductType & { index: number }).index = hoverIndex;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "Card",
    canDrag: typeData.isPresented === '1',
    item: () => {
      return { index, ...typeData }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  const itemStyle = "flex justify-between gap-2 items-center p-2 my-2 cursor-pointer border-solid border-2 rounded border-gray-400"

  if (typeData.isPresented === "0") {
    return (
      <li className={`${itemStyle} bg-gray-300 opacity-70 cursor-not-allowed border-none`}
        ref={ref} data-handler-id={handlerId}>
        <p className='text-xl font-bold'>{typeData.order}.</p>
        <p className=''>{typeData.label}</p>
        <img className=' max-w-[40px]'
          src={typeData.imgSrc} alt={typeData.label + " picture"} />

      </li>

    )
  }


  return (
    <li className={`${itemStyle} ${isDragging ? 'opacity-50' : ''}`}
      ref={ref} data-handler-id={handlerId}>
      <p className='text-xl font-bold'>{typeData.order}.</p>
      <p>{typeData.label}</p>
      <img className='max-w-[40px]'
        src={typeData.imgSrc} alt={typeData.label + " picture"} />

    </li>)

}



const ListProductTypeOrder = () => {

  const { productTypeList, updateProductTypeItem } = useProductTypeStore();
  const [tempList, setTempList] = useState(productTypeList)

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTempList((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  const onClickSave = () => {
    const newOrderList = tempList.filter(item => item.isPresented === "1").map((item, idx) => {
      return { id: item.id, order: idx }
    })

    PATCH_productTypeOrder(newOrderList)
      .then((result) => {
        result.data
          ?.map((item: any) => { return { id: item.productTypeId, order: item.order } })
          ?.forEach((item: any) => updateProductTypeItem(item));
        alert("Order saved successfully");
      }).catch((err) => {
        console.log(err)
        alert("Error occurred while saving order");
      })
  }



  return (
    <DndProvider backend={HTML5Backend}>
      <Button className='max-w-[250px]' onClick={onClickSave}>Save Order</Button>
      <ul className='flex flex-col'>
        {tempList
          ?.sort((a, b) => Number(b.isPresented) - Number(a.isPresented))
          .map((typeData, idx) => (
            <OrderItem key={typeData.id} typeData={typeData} index={idx} moveCard={moveCard} />
          ))}
      </ul>
    </DndProvider>
  )
}

export default ListProductTypeOrder