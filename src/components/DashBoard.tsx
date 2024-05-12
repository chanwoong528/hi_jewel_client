import { GET_stats, GetStatType } from '@/http/fetchApi/statsApi'
import useProductStore, { Product } from '@/store/productStore'
import { groupByDate, joinTwoArray } from '@/utils/utilsFunction'
import React, { useEffect } from 'react'
// import ChartLine from './chart/ChartLine'

type AdditionalProduct = Product & { total: string, productId: string }
type TypeGeneralStat = {
  date: string;
  type: string;
  count: string;
  userAgent: string;
}

enum TypeLabel {
  visitorCount = "Visitor Number",

  instaClick = "Instagram Click",

}


const DashBoard = () => {
  const [generalStats, setGeneralStats] = React.useState<any>({})
  const [productStats, setProductStats] = React.useState<any>([])

  const { productList } = useProductStore()

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const dateStats = await GET_stats(GetStatType.viewsByDateArr);
        const productCount = await GET_stats(GetStatType.totalProductCount);

        Promise.all([dateStats, productCount])
          .then(([dateData, productCountData]) => {
            // You can use dateData and productCountData here
            setGeneralStats(groupByDate(dateData.data))
            setProductStats(joinTwoArray(productList, productCountData.data, "id", "productId")
            )
          })
      } catch (error) {
        alert('error with fetch statistic')
      }
    }
    fetchStats();
  }, [])




  return (

    <div>
      <div className='flex justify-between max-w-[600px] m-auto'>
        {Object
          .keys(generalStats)
          ?.map((key, idx) => (
            <div key={key + idx} className='border-2 border-solid border-black rounded p-3'>
              <h2 className='text-xl'>{key}</h2>
              <ul>
                {generalStats[key]
                  ?.map((item: TypeGeneralStat, idx: number) => {

                    return (
                      <li className='flex gap-2'
                        key={item.type + item.date + idx}>
                        <p>{(item.userAgent)}</p>
                        <p>{TypeLabel[item.type as keyof typeof TypeLabel]}:</p>

                        <p className='font-bold'>{item.count}</p>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))
        }</div>

      {/* <div>
        <ChartLine data={generalStats} />
      </div> */}

      <div className='max-w-[600px] my-2'>
        <h2 className='border-b-2 border-solid border-black ' >Product Count</h2>
        <ul className='flex flex-col gap-2 my-2 '>
          {productStats?.map((item: AdditionalProduct) => (
            <li key={item.id} className='flex gap-4 item-center border-solid border-black border-2 px-4 py-2'>
              <p className='w-[10%]'>{item.title}</p>
              <img className=' max-w-[40px]' src={item.imgSrc} alt="" />
              <p>Click Count: {item.total}</p>
            </li>))}
        </ul>
      </div >
    </div>
  )
}

export default DashBoard