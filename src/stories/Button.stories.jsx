
import { Button } from '../components/Button/Button';

export default {
  title: 'Stories/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Buttons_Invetory = Template.bind({});
Buttons_Invetory.args = {
  type: 'create',
  system: 'inventory',
  label: 'Crear Cliente',
};

export const Buttons_Accounting = Template.bind({});
Buttons_Accounting.args = {
  type: 'create',
  system: 'accounting',
  label: 'Crear Cuenta',
};

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
