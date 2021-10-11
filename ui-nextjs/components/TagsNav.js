import React from "react";
import Link from 'next/link'

const TagsNav = ({tags}) => (
    <div>
        <h2>Tags</h2>
        <ul className="list-group list-group-flush">
            {tags.map(tag => (
                <li key={tag.id} className="list-group-item">
                    <Link href={{
                        pathname: '/bookmarks/tags/[name]',
                        query: { name: tag.name },
                        }}>
                        <a>{tag.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default TagsNav;
