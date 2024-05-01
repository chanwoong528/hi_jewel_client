import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface DefaultModalProps {
  children: React.ReactNode
  headerChild: React.ReactNode

  dialogTitle: string
  conditionalProps?: conditionalProps
}
interface conditionalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
};

const DetailModal = ({
  children,
  headerChild,
  dialogTitle,
  conditionalProps
}: DefaultModalProps) => {

  return (
    <Dialog
      {...conditionalProps}
    >

      <DialogTrigger asChild>
        {headerChild}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DetailModal