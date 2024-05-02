"use client";
import { Review } from "@/_utils/_schemas";
const Cookies = require("js-cookie");

export default function Listreview(listreview: Review) {

    const commentStyle: React.CSSProperties = {
        whiteSpace: "pre-line",
        wordWrap: "break-word" as "break-word"
    };

    return (
        <div className="py-3">
            <div className="card card-side shadow-xl bg-white text-black max-w-96">
                <div className="card-body">
                    <h4 className="card-title">{listreview.username}</h4>
                    <p style={commentStyle}>Commentaire : {listreview.review}</p>
                </div>
            </div>
        </div>
    );
}
