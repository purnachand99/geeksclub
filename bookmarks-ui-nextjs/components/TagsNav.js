import React from "react";
import Link from 'next/link'

const TagsNav = ({tags}) => (
    <div>
        <h2>Tags</h2>
        <ul>
            {tags.map(tag => (
                <li key={tag.id}>
                    <Link href={{
                        pathname: '/tags/[name]',
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
