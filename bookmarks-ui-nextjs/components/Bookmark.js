import React from "react";
import Link from 'next/link'

const Bookmark = props => (
  <div className="col-12">
    <div className="alert alert-primary" role="alert">
      <h5>
        <Link href={props.bookmark.url}>
          <a target={"_blank"}>{props.bookmark.title}</a>
        </Link>
      </h5>
      <p className={"mb-0"}>
        { props.bookmark.tags.map(tag =>
          <span key={tag} style={{paddingRight: "10px"}}>
               <Link href={{
                 pathname: '/tags/[name]',
                 query: { name: tag },
               }}>
                 <a><span className="badge badge-primary" style={{fontSize: "15px"}}>{tag}</span></a>
               </Link>
              </span>
        )}
      </p>
    </div>
  </div>
);
export default Bookmark;
