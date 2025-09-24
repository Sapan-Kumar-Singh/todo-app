import { useMemo } from "react";

export const Skeleton = ({ layout, tabs, isFullWidth, styles, height }: any) => {
  const gridHeight = useMemo(() => {
    return (
    typeof height === 'number' ? `${height}px` :
    typeof height === 'string' && (height.endsWith('px') || height.endsWith('vh')) ? height :
    '250px'
    )
  },[height])
    
  return layout === "homePage" ? (
    <div
      style={{
        paddingLeft: "2%",
        paddingRight: "1%",
        paddingTop: "2%",
        paddingBottom: "2%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div
          className={`skeleton-loader mr-14 mb-4 bg-[#F0F2F5] p-4 w-16`}
          style={{ width: "15%" }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: "60%",
            width: "100%",
          }}
        >
          <div
            className={`skeleton-loader mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
            style={{ width: "50%" }}
          ></div>
          <div
            className={`skeleton-loader mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>
      {/* <div
          className={`skeleton-loader  ${
            isFullWidth ? 'h-[252px]' : 'h-[292px]'
          } bg-[#F0F2F5] rounded p-3 w-full mx-auto`}
        ></div> */}
    </div>
  ) : layout === "projectHomePage" ? (
    <div
      style={{
        paddingLeft: "2%",
        paddingRight: "1%",
        paddingTop: "1.8%",
        paddingBottom: "2%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "60%",
            width: "100%",
          }}
        >
          <div
            className={`skeleton-loader mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
            style={{ width: "35%", padding: "1rem" }}
          ></div>
          <div
            className={`skeleton-loader mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
            style={{ width: "100%", padding: "1rem" }}
          ></div>
        </div>
      </div>
    </div>
  ) : layout === "projectHeader" ? (
    <span className="min-w-[25ch] min-h-[1.5ch] ml-1 inline-block rounded-md animate-pulse bg-slate-300"></span>
  ) : layout === "grid-skeleton" ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: gridHeight,
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        ...styles,
      }}
    >
      <div className={`shadow-md rounded p-3 w-full h-full mx-auto`} >
          {layout === "graph" ? (
            <div className={`grid grid-cols-3 gap-4`}>
              <div className="skeleton-loader col-span-2 h-[252px] bg-[#F0F2F5]  p-3  w-full mx-auto"></div>
              {/* h-[225px] */}
              <div className="mt-5">
                {[...Array(6)].map((_x, i) => (
                  <div
                    key={"load_item_" + i}
                    className={`skeleton-loader bg-[#F0F2F5]  p-3  mt-2  w-3/5 mx-auto`}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`skeleton-loader h-full bg-[#F0F2F5] rounded p-3 w-full mx-auto`}
            ></div>
          )}
      </div>
    </div>
  ) : layout === "projectCreation" ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div className="shadow-md h-[352px] rounded p-3 w-full mx-auto skeleton">
        <div className={`tabs flex flex-wrap`}>
          {[...Array(tabs)].map((_x, i) => (
            <div
              key={"load_item_" + i}
              className={`skeleton-loader mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
            ></div>
          ))}
        </div>

        <div className={``}>
          {
            <div
              className={`skeleton-loader ${
                isFullWidth ? "h-[252px]" : "h-[292px]"
              } bg-[#F0F2F5] rounded p-3 w-full mx-auto`}
            ></div>
          }
        </div>
      </div>
    </div>
  ) : layout === "submit" ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div className="shadow-md h-[352px] rounded p-3 w-full mx-auto skeleton">
        <div className={`tabs flex flex-wrap`}>
          {[...Array(tabs)].map((_x, i) => (
            <div
              key={"load_item_" + i}
              className={`skeleton-loader mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
            ></div>
          ))}
        </div>

        <div className={``}>
          {
            <div
              className={`skeleton-loader ${
                isFullWidth ? "h-[252px]" : "h-[292px]"
              } bg-[#F0F2F5] rounded p-3 w-full mx-auto`}
            ></div>
          }
        </div>
      </div>
    </div>
  ) : layout === "checkListProgress" ? (
    <div
      className={`skeleton-loader checklist-progress mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
    ></div>
  ) : layout === "widget" ? (
      <div
        className={`py-4 px-3 h-[380px] flex flex-col ${
          isFullWidth ? "w-full" : "w-[49.5%]"
        } border border-grayborder mt-4 bg-white rounded-md hover:shadow-xl overflow-auto lg:overflow-hidden`}
      >
        <div className="animate-pulse h-full w-full rounded-md bg-slate-300"></div>
      </div>
  ) : layout === "sideMenu" ? (
    <div className="flex flex-col gap-4 py-3 pl-3 pr-6 mt-2">
      {new Array(17).fill("").map((v, idx) => (
        <div
          key={idx}
          className="rounded-lg h-6 w-full animate-pulse bg-slate-800"
        />
      ))}
    </div>
  ) : layout === "list" ? (
    <div className="w-full mt-2 flex flex-col gap-3 justify-center items-center">
      {new Array(8).fill("").map((v, idx) => (
        <div key={idx} className="skeleton-loader h-10  w-full" />
      ))}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        ...styles,
      }}
    >
      <div className="shadow-md h-[352px] rounded p-3 w-full mx-auto skeleton">
        <div className={`tabs flex flex-wrap`}>
          {[...Array(tabs)].map((_x, i) => (
            <div
              key={"load_item_" + i}
              className={`skeleton-loader mr-2 mb-4 bg-[#F0F2F5] p-3 w-16`}
            ></div>
          ))}
        </div>

        <div className={``}>
          {layout === "graph" ? (
            <div className={`grid grid-cols-3 gap-4`}>
              <div className="skeleton-loader col-span-2 h-[252px] bg-[#F0F2F5]  p-3  w-full mx-auto"></div>
              <div className="mt-5">
                {[...Array(6)].map((_x, i) => (
                  <div
                    key={"load_item_" + i}
                    className={`skeleton-loader bg-[#F0F2F5]  p-3  mt-2  w-3/5 mx-auto`}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`skeleton-loader ${
                isFullWidth ? "h-[252px]" : "h-[292px]"
              } bg-[#F0F2F5] rounded p-3 w-full mx-auto`}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};