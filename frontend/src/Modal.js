import React, { useEffect } from "react";
import $ from "jquery";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Modal({ data, setData }) {
  useEffect(() => {
    if (data.shortUrl !== "") {
      window.$(".modal").modal("show"); // window will help us to refer golbal jquery $
    }
  }, [data.shortUrl]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Short URL
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{data.shortUrl}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                window.$(".modal").modal("hide");
                setData({
                  url: "",
                  shortUrl: "",
                  err: "",
                  success: false,
                  loading: false,
                });
              }}
            >
              Close
            </button>
            <CopyToClipboard text={data.shortUrl}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.$(".modal").modal("hide");
                }}
              >
                Copy URL
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}
