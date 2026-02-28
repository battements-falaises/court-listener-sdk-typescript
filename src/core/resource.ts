// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { CourtListener } from '../client';

export abstract class APIResource {
  protected _client: CourtListener;

  constructor(client: CourtListener) {
    this._client = client;
  }
}
