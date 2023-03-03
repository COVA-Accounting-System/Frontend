

export const orderState = [
  {
    state: 'Pending',
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
    color: 'acsys.greenColorState'
  },
  {
    state: 'Sold',
    stateSpanish: 'Vendido',
    color: 'acsys.blueColorState'
  }
]

export const minOrderState = 0;
export const maxOrderState = orderState.length;
