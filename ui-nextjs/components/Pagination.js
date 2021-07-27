import React from "react";
import Link from 'next/link'

const Pagination = ({bookmarks, path}) => (
    <div>
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {!bookmarks.isFirst && <li className="page-item">
                    <Link href={{pathname: path, query: { page: 1 }}}>
                        <a className="page-link">First</a>
                    </Link>
                </li> }
                {bookmarks.isFirst && <li className="page-item disabled">
                    <Link href={{pathname: path, query: { page: 1 }}}>
                        <a className="page-link">First</a>
                    </Link>
                </li> }


                {!bookmarks.hasPrevious && <li className="page-item disabled">
                    <Link href={{pathname: path, query: { page: bookmarks.pageNumber - 1 }}}>
                        <a className="page-link">Previous</a>
                    </Link>
                </li> }
                {bookmarks.hasPrevious && <li className="page-item">
                    <Link href={{pathname: path, query: { page: bookmarks.pageNumber - 1 }}}>
                        <a className="page-link">Previous</a>
                    </Link>
                </li> }

                {!bookmarks.hasNext && <li className="page-item disabled">
                    <Link href={{pathname: path, query: { page: bookmarks.pageNumber + 1 }}}>
                        <a className="page-link">Next</a>
                    </Link>
                </li> }
                {bookmarks.hasNext && <li className="page-item">
                    <Link href={{pathname: path, query: { page: bookmarks.pageNumber + 1 }}}>
                        <a className="page-link">Next</a>
                    </Link>
                </li> }

                {!bookmarks.isLast && <li className="page-item">
                    <Link href={{pathname: path, query: { page: bookmarks.totalPages }}}>
                        <a className="page-link">Last</a>
                    </Link>
                </li> }
                {bookmarks.isLast && <li className="page-item disabled">
                    <Link href={{pathname: path, query: { page: bookmarks.totalPages }}}>
                        <a className="page-link">Last</a>
                    </Link>
                </li> }

            </ul>
        </nav>

    </div>
);

export default Pagination;
