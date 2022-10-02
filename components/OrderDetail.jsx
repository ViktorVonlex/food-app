import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from '../styles/OrderDetail2.module.css'

function OrderDetail({ total, createOrder }) {

  const submitClick = (values) => {
        values.total = total
        values.method = 0
        createOrder(values)
  }

  const form = useForm({
    initialValues: {
      firstName: '',
      surName: '',
      email: '',
      phone: '',
      address: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box className={styles.container} sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitClick(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
    
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="Your first name"
          {...form.getInputProps('firstName')}
        />

        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Your last name"
          {...form.getInputProps('surName')}
        />

        <TextInput
          withAsterisk
          label="Phone Number"
          placeholder="Your phone number"
          {...form.getInputProps('phone')}
        />

        <TextInput
          withAsterisk
          label="Address"
          placeholder="Your delivery address"
          {...form.getInputProps('address')}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default OrderDetail