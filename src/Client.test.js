import Client from './Client';

it('does not send a request without a server credential boundary', async () => {
  const fetchRequest = jest.fn();
  global.fetch = fetchRequest;
  let failure;
  try {
    await Client.search('example product', jest.fn());
  } catch (error) {
    failure = error;
  }
  expect(failure.message).toMatch(/disabled/);
  expect(fetchRequest).not.toHaveBeenCalled();
});
