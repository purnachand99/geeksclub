import React, {useState} from "react";

const BookmarksSearchForm = (props) => {
    const [query, setQuery] = useState("");

    const handleSearch = e => {
        e.preventDefault();
        props.history.push(`/bookmarks/search?page=1&query=${query}`);
    };
    return (
        <div className={"container"}>
            <form className="form-inline pb-3" method="get" onSubmit={handleSearch}>
                <div className="form-group  col-md-9">
                    <input className="col-md-12 form-control" type="search" name="query"
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <button className="btn btn-primary btn" type="submit">Search</button>
            </form>
        </div>
    );
};

export default BookmarksSearchForm;
