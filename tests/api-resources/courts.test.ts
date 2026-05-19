// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import CourtListener from 'court-listener-sdk';

const client = new CourtListener({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource courts', () => {
  test('retrieve', async () => {
    const responsePromise = client.courts.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.courts.retrieve(
        'id',
        {
          fields: 'fields',
          format: 'json',
          omit: 'omit',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(CourtListener.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.courts.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.courts.list(
        {
          id: 'id',
          count: 'on',
          cursor: 'cursor',
          date_modified: '2019-12-27T18:11:19.117Z',
          date_modified__gte: '2019-12-27T18:11:19.117Z',
          date_modified__lte: '2019-12-27T18:11:19.117Z',
          fields: 'fields',
          format: 'json',
          full_name: 'full_name',
          full_name__startswith: 'full_name__startswith',
          id__in: 'id__in',
          jurisdiction: 'jurisdiction',
          omit: 'omit',
          order_by: 'order_by',
          page: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(CourtListener.NotFoundError);
  });
});
