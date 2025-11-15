import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../helper/utils";


const basUrl=import.meta.env.VITE_BASE_URL;

 
function trimAll(obj: { [x: string]: any }) {
  for (const prop in obj) {
    if (typeof obj[prop] === "string") {
      obj[prop] = obj[prop].trim();
    } else {
      trimAll(obj[prop]);
    }
  }
}

const invalidatesTagsHandler = (result: any, _error: any, arg: any) => {
  let tag: any = [];
  if (arg?.__config__?.invalidatesTags) {
    const {
      __config__: { invalidatesTags },
    } = arg;
    tag = invalidatesTags(result);
  }
  return tag;
};

const showInfoAndWarningMessages = (data: any) => {
  if (data.WarningMessage) {
    console.log("show waringg toast");
  }
  if (data.InfoMessage) {
    console.log("show info toast");
  }
};

export const omit = (obj: Record<string, any>, fields: string[]) =>
  Object.keys(obj)
    .filter((key) => fields.indexOf(key) < 0)
    .reduce(
      (obj2, key) => ((obj2[key] = obj[key]), obj2),
      {} as Record<string, any>
    );

const onQueryStartedHandle = async (
  arg: any,
  { dispatch, queryFulfilled, requestId }: any
) => {
  const { onQueryStarted, onQueryFulfilled, loadingMask } =
    arg?.__config__ || {};
  onQueryStarted && onQueryStarted(dispatch);
  const { __config__, ...restArg } = arg;
  const argMeta = omit({ ...__config__, ...restArg }, [
    "providesTags",
    "transformResponse",
    "invalidatesTags",
    "onQueryFulfilled",
    "onQueryStarted",
  ]);

  const metadata: Record<string, any> = {
    ...argMeta,
    requestId,
    path: `${window?.location?.pathname}${window?.location?.search}`,
  };

  if (loadingMask) {
    // showFullScreenLoading();
  }

  try {
    const { data, meta } = await queryFulfilled;

    if (loadingMask) {
      // hideFullScreenLoading();
    }
    showInfoAndWarningMessages(data);
    switch (data.Status) {
      case "AUTH_ERROR": {
        localStorage.removeItem("token");
        setTimeout(function () {
          if (window?.location?.pathname !== "/login") {
            window?.location?.reload();
          }
        }, 0);
        break;
      }
      case "ERROR": {
        const message = data.Message;

        const errorMessage = Array.isArray(message)
          ? message.join(" ")
          : message;
        if (errorMessage) {
          console.error("Network error", errorMessage);
        }
        break;
      }
      default: {
        onQueryFulfilled && onQueryFulfilled({ ...data }, dispatch);
      }
    }
  } catch (e: any) {
    if (loadingMask) {
      //hideFullScreenLoading();
    }

    const statusMessages: Record<number, string> = {
      503: "The server is unable to handle this request. Please try again.",
      502: "Request timeout. Please try again.",
      404: "Reuqested resource not found.",
    };

    if (typeof e === "object" && e !== null && e.error) {
      if (e?.error.status === "PARSING_ERROR") {
        const htmlRegExp = /<[a-z][\s\S]*>/i;
        if (htmlRegExp.test(e?.error?.data)) {
          if (/5|4\d\d/.test(e?.error.originalStatus?.toString())) {
            // showToast(
            //   "error",
            //   `${statusMessages[e?.error.originalStatus] || e?.error.error
            //   } (http status=${e.error.originalStatus})`
            // );
          }
        } else {
          // showToast("error", e?.error.error, "drawer");
        }
      } else if (e?.status === 200) {
        // showToast("error", "No response returned from query.");
      } else {
        console.log(e);
      }
    }
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl:basUrl,
    prepareHeaders:(headers)=>{
           const token=getToken();
          if(token){
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
    }
  }),
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: (params: any) => {
        const config = params?.__config__ || {
          url: "query",
          method: "get",
        };
        const payload = Array.isArray(params) ? [...params] : { ...params };
        const payloadInfo = { ...payload };
        delete payload.__config__;
        let url = config?.url || "query";
        let method = config?.method || "GET";
        const responseHandler = async (response: any) => {
          return response.json();
        };
        if (payload) {
          if (!Array.isArray(payload) && method === "GET") {
            url += `?${new URLSearchParams(payload).toString()}`;
          } else {
            method = "POST";
          }
        }
        if (method === "GET") {
          return {
            url,
            responseHandler,
            payloadInfo,
          };
        } else {
          return {
            url,
            method,
            body: payload,
            responseHandler,
            payloadInfo,
          };
        }
      },
      providesTags(result, _error: any, arg) {
        let tag: any = [];
        if (arg && arg.__config__ && arg.__config__.providesTags) {
          const { providesTags } = arg.__config__;
          tag = providesTags(result);
        }
        return tag;
      },
      async onQueryStarted(arg: any, _extraOptions: any) {
        onQueryStartedHandle(arg, _extraOptions);
      },
      transformResponse: async (response: any, _meta: any, arg: any) => {
        const { transformResponse } = arg?.__config__ || {};
        transformResponse?.(response, _meta);
        return response;
      },
    }),

    noCacheFetchData: builder.query({
      query: (params: any) => {
        const config = params?.__config__ || {
          url: "query",
          method: "GET",
        };
        const payload = Array.isArray(params) ? [...params] : { ...params };
        const payloadInfo = { ...payload };
        delete payload.__config__;

        let url = config?.url || "query";
        let method = config?.method || "GET";
        const responseHandler = async (response: any) => {
          let res = null;
          res = response.json();

          return res.json();
        };
        if (payload) {
          if (!Array.isArray(payload) && method === "GET") {
            url += `?${new URLSearchParams(payload).toString()}`;
          } else {
            method = "POST";
          }
        }
        if (method === "GET") {
          return {
            url,
            responseHandler,
            payloadInfo,
          };
        } else {
          return {
            url,
            method,
            body: payload,
            responseHandler,
            payloadInfo,
          };
        }
      },
      providesTags(result: any, _error: any, arg: any) {
        let tag: any = [];
        if (arg && arg.__config__ && arg.__config__.providesTags) {
          const { providesTags } = arg.__config__;
          tag = providesTags(result);
        }
       
        return tag;
      },

      async onQueryStarted(arg: any, _extraOptions: any) {
        onQueryStartedHandle(arg, _extraOptions);
      },
      transformResponse: async (response: any, _meta: any, arg: any) => {
        const { transformResponse } = arg?.__config__ || {};
        transformResponse && transformResponse(response, _meta);
        return response;
      },
      keepUnusedDataFor: 1,
    }),

    updateData: builder.mutation({
      query: (params: any) => {
        const { name, body } = params;
        const copiedPayload = JSON.parse(JSON.stringify(body));
        trimAll(copiedPayload);
        const config = params?.__config__ || {
          url: name
            ? `update?${new URLSearchParams(name).toString()}`
            : "update",
          method: "POST",
        };
        const payload = Array.isArray(params) ? [...params] : { ...params };
        delete payload.__config__;

        const url =
          config?.url ||
          (name ? `update?${new URLSearchParams(name).toString()}` : "update");
        const method = config?.method || "POST";
          // console.log("url--",url);
          // console.log("body--",JSON.stringify(copiedPayload))
        return {
          url: url,
          method: method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(copiedPayload),
        };
      },

      invalidatesTags(result: any, _error: any, arg: any) {
        
        return invalidatesTagsHandler(result, _error, arg);
      },

      async onQueryStarted(arg: any, _extraOptions: any) {
        onQueryStartedHandle(arg, _extraOptions);
      },
    }),
  }),
});

export const {
  useFetchDataQuery,
  useNoCacheFetchDataQuery,
  useUpdateDataMutation,
  useLazyFetchDataQuery,
  useLazyNoCacheFetchDataQuery,
} = api;

export const getResultSelectorWithErrorHandler = (
  selectFromResult: (r: any) => any
) => {
  return (response: any) => {
    if (
      response.status === "fulfilled" &&
      response.currentData &&
      response.currentData.Status === "ERROR"
    ) {
      return {
        ...response,
        data: undefined,
        isError: true,
        error: new Error(response.currentData.Message),
      };
    }
    if (selectFromResult) {
      try {
        return { ...selectFromResult(response) };
      } catch (error) {
        return {
          ...response,
          isError: true,
          error: error,
          data: undefined,
        };
      }
    }
    return response;
  };
};
