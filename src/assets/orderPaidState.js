export const orderPaidState = [
    {
        state: 'Not paid',
        stateSpanish: 'No pagado',
        color: 'red'
      },
      {
        state: 'Partial payment',
        stateSpanish: 'Pago incompleto',
        color: 'yellow'
      },
      {
        state: 'Paid',
        stateSpanish: 'Pagado',
        color: 'red'
      }
]

export const minOrderPaidState = 0;
export const maxOrderPaidState = orderPaidState.length - 1;
