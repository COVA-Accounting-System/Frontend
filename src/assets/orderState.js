export const orderState = [
  {
    state: 'On hold',
    stateSpanish: 'En fila',
    color: 'acsys.redColorState',
    progress: 0
  },
  {
    states: 'In production',
    stateSpanish: 'En producción',
    color: 'acsys.violetColorState',
    progress: 33
  },
  {
    state: 'Finished',
    stateSpanish: 'Terminado',
    color: 'acsys.blueColorState',
    progress: 66
  },
  {
    state: 'Delivered',
    stateSpanish: 'Entregado',
    color: 'acsys.greenColorState',
    progress: 100
  }
]

export const minOrderState = 0;
export const maxOrderState = orderState.length - 1;
