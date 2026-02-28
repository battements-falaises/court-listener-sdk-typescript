// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import CourtListener from 'court-listener-sdk-typescript';

const client = new CourtListener({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource clusters', () => {
  test('retrieve', async () => {
    const responsePromise = client.clusters.retrieve(0);
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
      client.clusters.retrieve(
        0,
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
    const responsePromise = client.clusters.list();
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
      client.clusters.list(
        {
          id: 0,
          citation: 'citation',
          count: 'on',
          cursor: 'cursor',
          date_created: '2019-12-27T18:11:19.117Z',
          date_created__gte: '2019-12-27T18:11:19.117Z',
          date_created__lte: '2019-12-27T18:11:19.117Z',
          date_filed: '2019-12-27',
          date_filed__gte: '2019-12-27',
          date_filed__lte: '2019-12-27',
          date_modified: '2019-12-27T18:11:19.117Z',
          date_modified__gte: '2019-12-27T18:11:19.117Z',
          date_modified__lte: '2019-12-27T18:11:19.117Z',
          docket: 0,
          docket__court: 'docket__court',
          docket__docket_number: 'docket__docket_number',
          fields: 'fields',
          format: 'json',
          id__gt: 0,
          id__gte: 0,
          id__lt: 0,
          id__lte: 0,
          id__range: 'id__range',
          judges: 'judges',
          omit: 'omit',
          order_by: 'order_by',
          page: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(CourtListener.NotFoundError);
  });
});
