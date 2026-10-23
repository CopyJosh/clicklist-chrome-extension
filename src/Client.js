// Browser code cannot keep API credentials private.
function search() {
  return Promise.reject(new Error('Nutrition search is disabled until a secure server API is configured.'));
}

export default { search };
