// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { CourtListenerSDK } from '../client';

export abstract class APIResource {
  protected _client: CourtListenerSDK;

  constructor(client: CourtListenerSDK) {
    this._client = client;
  }
}
