import React, { useState } from 'react';
import { graphql } from 'gatsby';
import * as JsSearch from "js-search"

import Layout from '@/components/layout';
import SEO from '@/components/seo';
import ItemCard from '@/components/ItemCard'
import { fade, withStyles } from "@material-ui/core/styles";

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

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
     
  // setIsLoading(true);
  // setSearchResults([]);
  // setSearch(null);
  // setIsError(false);
  // setSearchQuery("");  

  const { data, classes } = props

  const items = data.allItem.edges
  

  var jsSearch = new JsSearch.Search(['node', 'id']);
  jsSearch.addIndex(['node', 'title_en']);
  jsSearch.addIndex(['node', 'detail_en'])
  jsSearch.addIndex(['node', 'title_zh']);
  jsSearch.addIndex(['node', 'detail_zh'])

  jsSearch.addDocuments(items)

  const onChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchResults(jsSearch.search(e.target.value))
  };

  const queryResults = searchQuery === "" ? items : searchResults
  return (
    <>
      <SEO title="Home" />
      <div className={classes.root}>
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
          Number of items:
              {queryResults.length}
        <div className={classes.flexBoxParentDiv}>
          {queryResults.map((item ,index) => (

            <ItemCard key={index} item={item} />

          ))}
        </div>
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
