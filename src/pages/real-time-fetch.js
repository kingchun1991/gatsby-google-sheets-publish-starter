import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ItemCard from '@/components/ItemCard2'

import { fade, withStyles } from "@material-ui/core/styles";
import * as JsSearch from "js-search"
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';

const csv2json = require('csvtojson');

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



const SecondPage = props => {
  const { classes } = props
  // Client-side Runtime Data Fetching
  // highlight-start

 

  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const alwaysEnabled = false
  const isDebug = false
  const poxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMf21Q2u8IXza55EClr4tlEn-hpHwoyZGxqS1Wy9xfjDRF5fy0MGjice0i2ONIaoIdp72pHQem7O6Z/pub?gid=0&single=true&output=csv&headers=0&range=A2:ZZ'
  useEffect(() => {
    fetch(poxyUrl + googleSheetUrl)
      .then(response => response.text())
      .then(resultDataText => csv2json().fromString(resultDataText)) // parse JSON from request
      .then(resultData => {
        resultData
          .filter(
            r => alwaysEnabled || (isDebug && r.enabled === "N") || r.enabled === "Y"
          )
        setData(resultData)
      })
  }, [])
  // highlight-end

  var jsSearch = new JsSearch.Search('title_en');
  jsSearch.addIndex( 'title_en');
  jsSearch.addIndex( 'detail_en')
  jsSearch.addIndex( 'title_zh');
  jsSearch.addIndex( 'detail_zh')

  jsSearch.addDocuments(data)

  const onChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchResults(jsSearch.search(e.target.value))
  };

  const queryResults = searchQuery === "" ? data : searchResults
  //const queryResults = searchQuery === "" ? items : searchResults
  //const fetchResults = data
  return (
    <>
      <SEO title="RealTimeFetch" />
      <h1>Hi This page is real time client-side fetch data from Google Sheet without  API  </h1>
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
          {queryResults.map((item, index) => (

            <ItemCard key={index} item={item} />

          ))}
        </div>
      </div>
    </>
  )
}

export default withStyles(styles)(SecondPage);
