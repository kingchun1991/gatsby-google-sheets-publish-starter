import React, { useState } from 'react';
import { graphql } from 'gatsby';
import * as JsSearch from "js-search"

import Layout from '@/components/layout';
import SEO from '@/components/seo';
import ItemCard from '@/components/ItemCard'
import { fade, withStyles } from "@material-ui/core/styles";

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';

import Pagination from '@material-ui/lab/Pagination';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        margin: 10,
        width: 70,
        height: 70,
    },
    ListItemParentDiv: {
        display: "flex",
    },
    flexBoxParentDiv: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        "&::after": {
            content: "",
            flex: "auto",
        },
    },
    search: {
        justifyContent: "center",
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
})

const IndexPage = props => {

    // const [isLoading, setIsLoading] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    // const [search, setSearch] = useState(null);
    // const [isError, setIsError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);

    const { data, classes } = props;

    const pageSize = 9;

    const items = data.allItem.edges;


    var jsSearch = new JsSearch.Search(['node', 'id']);
    jsSearch.addIndex(['node', 'title_en']);
    jsSearch.addIndex(['node', 'detail_en'])
    jsSearch.addIndex(['node', 'title_zh']);
    jsSearch.addIndex(['node', 'detail_zh'])

    jsSearch.addDocuments(items)

    const onChange = (e) => {
        setPage(0);
        setSearchQuery(e.target.value);
        setSearchResults(jsSearch.search(e.target.value))
    };

    function scrollToSectionTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    function changePage(event, page) {
        scrollToSectionTop();
        setPage(page - 1);
    }

    const queryResults = searchQuery === "" ? items : searchResults

    const totalPages = Math.ceil(queryResults.length / pageSize);
    const pages = [];
    for (let index = 0; index < totalPages; index++) {
        pages.push(index + 1);
    }

    const pagedQueryResults = queryResults.slice(page * pageSize, page * pageSize + pageSize);

    return (
        <>
            <SEO title="Home" />
            <div className={classes.root}>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={onChange}
                        />
                    </div>
                </Box>
          Number of items:
              {queryResults.length}

                <div className={classes.flexBoxParentDiv}>
                    {pagedQueryResults.map((item, index) => (

                        <ItemCard key={index} item={item} />

                    ))}
                </div>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Pagination variant="outlined" shape="rounded" count={totalPages} onChange={changePage} />
                </Box>
            </div>
        </>
    );
};

export const query = graphql`
  query MyQuery {
    allItem(sort: {fields: datetime, order: DESC}) {
      edges {
        node {
          id
          title_en
          title_zh
          description_en
          description_zh
          detail_en
          detail_zh
          datetime
          productImage{
            publicURL
          }
        }
      }
    }
  }
`;

export default withStyles(styles)(IndexPage);