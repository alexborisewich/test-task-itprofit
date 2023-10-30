const baseApiURL = 'http://localhost:9090/api/';

export async function sendFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  const requestBody = {
    name: formData.get('name')!,
    email: formData.get('email')!,
    phone: formData.get('phone')!,
    message: formData.get('message')!,
  } as unknown as BodyInit;

  const response = await fetch(`${baseApiURL}registration`, {
    method: 'POST',
    body: requestBody,
  });

  return response;
}
