import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'

interface DefaultModalProps {
  children: React.ReactNode

  dialogTitle: string
  triggerTitle?: string
  conditionalProps?: conditionalProps
}
interface conditionalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
};

const DefaultModal = ({
  children,
  dialogTitle,
  triggerTitle,
  conditionalProps
}: DefaultModalProps) => {

  return (
    <Dialog {...conditionalProps} >
      {!!triggerTitle ?
        (<DialogTrigger asChild>
          <Button className='max-w-[250px] my-2 bg-slate-700'>{triggerTitle}</Button>
        </DialogTrigger>)
        : null}
      <DialogContent className="overflow-y-auto max-h-[70%]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DefaultModal