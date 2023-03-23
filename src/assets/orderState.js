export const orderState = [
  {
    state: 'On hold',
    stateSpanish: 'En fila',
    color: 'acsys.redColorState'
  },
  {
    states: 'In production',
    stateSpanish: 'En producción',
    color: 'acsys.violetColorState'
  },
  {
    state: 'Finished',
    stateSpanish: 'Terminado',
    color: 'acsys.blueColorState'
  },
  {
    state: 'Delivered',
    stateSpanish: 'Entregado',
    color: 'acsys.greenColorState'
  }
]

export const minOrderState = 0;
export const maxOrderState = orderState.length - 1;
