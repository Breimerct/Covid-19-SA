import mitt from 'mitt'

type Events = {
  showDialogHistoricalChart: {
    show: boolean
    title: string
    categoryCard: string
  }
}

const emitter = mitt<Events>()

export function useEventBus() {
  return {
    emit: emitter.emit,
    on: emitter.on,
    off: emitter.off
  }
}
