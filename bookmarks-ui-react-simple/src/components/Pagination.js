import React from "react";
import {NavLink} from "react-router-dom";

const Pagination = props => {

    const basePath = props.basePath;
    const searchParam = (props.query !== undefined && props.query !== "") ? "&query="+props.query : "";
    const tagParam = (props.tag !== undefined && props.tag !== "") ? "&tag="+props.tag : "";
    const firstPage = basePath + '?page=1'+ tagParam + searchParam;
    const prevPage = basePath + '?page='+(props.bookmarks.pageNumber - 1) + tagParam + searchParam;
    const nextPage = basePath + '?page='+(props.bookmarks.pageNumber + 1) + tagParam + searchParam;
    const lastPage = basePath + '?page='+(props.bookmarks.totalPages) + tagParam + searchParam;

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination pagination justify-content-center">
                {!props.bookmarks.hasPrevious &&
                <li className="page-item disabled">
                    <NavLink className="page-link" to={firstPage}>First</NavLink>
                </li>
                }
                {props.bookmarks.hasPrevious &&
                <li className="page-item">
                    <NavLink className="page-link" to={firstPage}>First</NavLink>
                </li>
                }

                {!props.bookmarks.hasPrevious &&
                <li className="page-item disabled">
                    <NavLink className="page-link" to={prevPage}>Previous</NavLink>
                </li>
                }
                {props.bookmarks.hasPrevious &&
                <li className="page-item">
                    <NavLink className="page-link" to={prevPage}>Previous</NavLink>
                </li>
                }

                {props.bookmarks.hasNext &&
                <li className="page-item">
                    <NavLink className="page-link" to={nextPage}>Next</NavLink>
                </li>
                }
                {!props.bookmarks.hasNext &&
                <li className="page-item disabled">
                    <NavLink className="page-link" to={nextPage}>Next</NavLink>
                </li>
                }

                {!props.bookmarks.hasNext &&
                <li className="page-item disabled">
                    <NavLink className="page-link" to={lastPage}>Last</NavLink>
                </li>
                }
                {props.bookmarks.hasNext &&
                <li className="page-item ">
                    <NavLink className="page-link" to={lastPage}>Last</NavLink>
                </li>
                }
            </ul>
        </nav>
    );
};
export default Pagination;
