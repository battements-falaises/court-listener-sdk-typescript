// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorURLPage, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Opinion clusters grouping related decisions from a single hearing.
 */
export class Clusters extends APIResource {
  /**
   * Look up a cluster by its ID. The cluster ID matches the ID used in CourtListener
   * case law URLs (e.g. `/opinion/2812209/obergefell-v-hodges/` corresponds to
   * cluster ID `2812209`).
   */
  retrieve(
    id: number,
    query: ClusterRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Cluster> {
    return this._client.get(path`/clusters/${id}/`, { query, ...options });
  }

  /**
   * Returns a paginated list of opinion clusters. Each cluster groups together
   * opinions from the same panel hearing (e.g. majority, dissent, concurrence). The
   * cluster `id` is used in CourtListener case law URLs.
   */
  list(
    query: ClusterListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ClustersCursorURLPage, Cluster> {
    return this._client.getAPIList('/clusters/', CursorURLPage<Cluster>, { query, ...options });
  }
}

export type ClustersCursorURLPage = CursorURLPage<Cluster>;

export interface Cluster {
  /**
   * Cluster ID — used in CourtListener case law URLs.
   */
  id?: number;

  /**
   * Relative URL path on CourtListener.
   */
  absolute_url?: string;

  blocked?: boolean;

  /**
   * Case name frozen at decision time (does not change).
   */
  case_name?: string;

  case_name_full?: string;

  case_name_short?: string;

  /**
   * Number of times this cluster has been cited.
   */
  citation_count?: number;

  /**
   * List of parallel citation objects for this cluster.
   */
  citations?: Array<Cluster.Citation>;

  correction?: string | null;

  cross_reference?: string | null;

  date_blocked?: string | null;

  date_created?: string;

  date_filed?: string | null;

  date_filed_is_approximate?: boolean;

  date_modified?: string;

  disposition?: string | null;

  /**
   * API URL of the parent docket.
   */
  docket?: string;

  headnotes?: string | null;

  history?: string | null;

  /**
   * Judge name(s) as a string (not yet normalized).
   */
  judges?: string | null;

  /**
   * API URLs of non-participating judges.
   */
  non_participating_judges?: Array<string>;

  other_dates?: string | null;

  /**
   * API URLs of judges on the panel (normalized).
   */
  panel?: Array<string>;

  /**
   * Whether this cluster is published, unpublished, etc.
   */
  precedential_status?: string;

  resource_uri?: string;

  slug?: string;

  /**
   * Source of this cluster data.
   */
  source?: string;

  /**
   * API URLs of opinions in this cluster.
   */
  sub_opinions?: Array<string>;

  summary?: string | null;

  syllabus?: string | null;
}

export namespace Cluster {
  /**
   * A parallel citation for an opinion cluster.
   */
  export interface Citation {
    /**
     * The starting page number in the reporter.
     */
    page?: string | null;

    /**
     * The reporter abbreviation (e.g. "U.S.", "S. Ct.").
     */
    reporter?: string;

    /**
     * The citation type identifier.
     */
    type?: number;

    /**
     * The volume number of the reporter.
     */
    volume?: number | null;
  }
}

export interface ClusterRetrieveParams {
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

export interface ClusterListParams {
  /**
   * Filter by cluster ID.
   */
  id?: number;

  /**
   * Filter by citation.
   */
  citation?: string;

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

  /**
   * Filter by the date the cluster was filed.
   */
  date_filed?: string;

  date_filed__gte?: string;

  date_filed__lte?: string;

  date_modified?: string;

  date_modified__gte?: string;

  date_modified__lte?: string;

  /**
   * Filter by parent docket ID.
   */
  docket?: number;

  /**
   * Filter by the court of the parent docket (e.g. `scotus`).
   */
  docket__court?: string;

  /**
   * Filter by the docket number of the parent docket.
   */
  docket__docket_number?: string;

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

  /**
   * Inclusive range (e.g. `100,500`).
   */
  id__range?: string;

  /**
   * Filter by judge name string.
   */
  judges?: string;

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
}

export declare namespace Clusters {
  export {
    type Cluster as Cluster,
    type ClustersCursorURLPage as ClustersCursorURLPage,
    type ClusterRetrieveParams as ClusterRetrieveParams,
    type ClusterListParams as ClusterListParams,
  };
}
