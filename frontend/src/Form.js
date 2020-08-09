import React from "react";

export default function Form({ data, setData }) {
  const generateUrl = () => {
    console.log(data);

    setData({ ...data, loading: true, success: false, err: "" });
    fetch("http://localhost:8000/getShortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application.json",
      },
      body: JSON.stringify({
        url: data.url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setData({ ...data, loading: false, success: false, err: "" });
        if (data.err) {
          return setData({ ...data, err: data.err });
        }
        setData({ ...data, shortUrl: data.shortUrl, success: true });
        console.log(data.shortUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Generate Short URL</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter URL e.g: https://www.example.com"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={data.url}
            onChange={(evnt) => {
              setData({ ...data, url: evnt.target.value });
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={generateUrl}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
