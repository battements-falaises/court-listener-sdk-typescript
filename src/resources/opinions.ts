// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorURLPage, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Individual judicial opinions with full text and metadata.
 */
export class Opinions extends APIResource {
  /**
   * Look up an opinion by its ID. Note that opinion IDs do **not** reliably match
   * cluster IDs. If you have a CourtListener case URL, use the cluster API to look
   * it up.
   */
  retrieve(
    id: number,
    query: OpinionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Opinion> {
    return this._client.get(path`/opinions/${id}/`, { query, ...options });
  }

  /**
   * Returns a paginated list of opinions. Each opinion contains the text of a
   * judicial decision and metadata about the authoring judge.
   *
   * **Tip**: Prefer the `html_with_citations` field for opinion text — it contains
   * the raw text with identified and linked citations, and is the field used on the
   * CourtListener website.
   *
   * Use `fields` / `omit` parameters to exclude large text fields you don't need.
   */
  list(
    query: OpinionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<OpinionsCursorURLPage, Opinion> {
    return this._client.getAPIList('/opinions/', CursorURLPage<Opinion>, { query, ...options });
  }
}

export type OpinionsCursorURLPage = CursorURLPage<Opinion>;

export interface Opinion {
  id?: number;

  /**
   * API URL of the authoring judge (normalized).
   */
  author?: string | null;

  /**
   * Author name as a string (not normalized).
   */
  author_str?: string | null;

  /**
   * API URL of the parent cluster.
   */
  cluster?: string;

  date_created?: string;

  date_modified?: string;

  /**
   * Original URL where the opinion was scraped from. Often unreliable as many courts
   * do not maintain stable URIs.
   */
  download_url?: string | null;

  /**
   * Whether the text was extracted via OCR.
   */
  extracted_by_ocr?: boolean;

  /**
   * HTML content from court websites (Word Perfect or HTML documents) or
   * Resource.org.
   */
  html?: string | null;

  /**
   * HTML content from the anonymous 2020 source.
   */
  html_anon_2020?: string | null;

  /**
   * HTML content from the Columbia collaboration.
   */
  html_columbia?: string | null;

  /**
   * HTML content from the Lawbox donation.
   */
  html_lawbox?: string | null;

  /**
   * **Recommended field.** HTML with citations identified and linked. This is the
   * field used on the CourtListener website.
   */
  html_with_citations?: string | null;

  /**
   * API URLs of judges who joined this opinion.
   */
  joined_by?: Array<string>;

  /**
   * Path to the binary file for the decision, if available.
   */
  local_path?: string | null;

  /**
   * API URLs of other opinions cited by this one.
   */
  opinions_cited?: Array<string>;

  /**
   * Sort order within the cluster. Only populated for opinions ingested from Harvard
   * or Columbia sources.
   */
  ordering_key?: number | null;

  /**
   * Whether this is a per curiam opinion.
   */
  per_curiam?: boolean;

  /**
   * Plain text of the opinion. Populated when sourced from a court website as PDF or
   * Microsoft Word document.
   */
  plain_text?: string | null;

  resource_uri?: string;

  /**
   * SHA-1 hash of the opinion content.
   */
  sha1?: string | null;

  /**
   * Opinion type (e.g. combined opinion, lead opinion, concurrence, dissent). Values
   * are number-prefixed for sort priority.
   */
  type?: string;

  /**
   * XML content from Harvard's Caselaw Access Project. Contains rich data but may
   * have OCR artifacts.
   */
  xml_harvard?: string | null;
}

export interface OpinionRetrieveParams {
  /**
   * Comma-separated list of fields to include. Supports nested fields via
   * double-underscore notation (e.g. `educations__id`).
   */
  fields?: string;

  /**
   * Response serialization format. JSON is default when no `Accept` header is
   * provided.
   */
  format?: 'json' | 'xml' | 'html';

  /**
   * Comma-separated list of fields to exclude. Supports nested fields via
   * double-underscore notation.
   */
  omit?: string;
}

export interface OpinionListParams {
  /**
   * Filter by opinion ID.
   */
  id?: number;

  /**
   * Filter opinions that cite this opinion ID.
   */
  cited_opinion?: number;

  /**
   * Filter by parent cluster ID.
   */
  cluster?: number;

  /**
   * Filter by court via the cluster's docket (e.g. `scotus`).
   */
  cluster__docket__court?: string;

  /**
   * Filter by docket number via the cluster's docket.
   */
  cluster__docket__docket_number?: string;

  /**
   * Set to `on` to return only the total count of matching items without result
   * data. When enabled, pagination parameters are ignored.
   */
  count?: 'on';

  /**
   * Cursor token for deep pagination. Returned in the `next` / `previous` fields of
   * paginated responses. Available when ordering by `id`, `date_modified`, or
   * `date_created`.
   */
  cursor?: string;

  date_created?: string;

  date_created__gte?: string;

  date_created__lte?: string;

  date_modified?: string;

  date_modified__gte?: string;

  date_modified__lte?: string;

  /**
   * Comma-separated list of fields to include. Supports nested fields via
   * double-underscore notation (e.g. `educations__id`).
   */
  fields?: string;

  /**
   * Response serialization format. JSON is default when no `Accept` header is
   * provided.
   */
  format?: 'json' | 'xml' | 'html';

  id__gt?: number;

  id__gte?: number;

  id__lt?: number;

  id__lte?: number;

  id__range?: string;

  /**
   * Comma-separated list of fields to exclude. Supports nested fields via
   * double-underscore notation.
   */
  omit?: string;

  /**
   * Comma-separated list of fields to order by. Prefix with `-` for descending
   * order. Use a secondary field as a tie-breaker for deterministic ordering (e.g.
   * `date_filed,id`).
   */
  order_by?: string;

  /**
   * Page number for standard pagination (limited to 100 pages).
   */
  page?: number;

  /**
   * Filter by opinion type. Values are prefixed with numbers for sort order. Common
   * types include combined opinion, lead opinion, concurrence, dissent, etc.
   */
  type?: string;
}

export declare namespace Opinions {
  export {
    type Opinion as Opinion,
    type OpinionsCursorURLPage as OpinionsCursorURLPage,
    type OpinionRetrieveParams as OpinionRetrieveParams,
    type OpinionListParams as OpinionListParams,
  };
}
