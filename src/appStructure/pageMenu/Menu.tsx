import { Autocomplete, Box, Collapse, Drawer as MuiDrawer, List, ListItemButton, ListItemText, TextField, styled } from "@mui/material";
import MenuListItem, { MenuListItemSimple } from "./MenuListItem";

const hideMenu: boolean = false

import { BrowserRouter } from "react-router-dom";

import { ComponentPage, ComponentPageList } from "../menuTypes";
import pages from "../pageMenu/generatePagesCollection";
import AllRoutes from "../routes";
import { useState } from "react";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PageList = () => {

    const drawerWidth = 260;
    const [isDrawerOpen, setIsDrawerOpen] = useState(!hideMenu);
    const [open, setOpen] = useState('');
    const [openAllFolders, setOpenAllFolders] = useState(false);
    const [pagesCollection, setPagesCollection] = useState(pages)
    const [searchValues, setSearchValuess] = useState<string[]>()
    const dense = true

    const handleClick = (name: string) => {
        name == open ? setOpen('') : setOpen(name)
    };

    const filteredSearchResults = () => {
        let results: string[] = []
        pages.map((collection) => {
            collection.components.map((page) => {
                results.push(page.menuCaption)
            })
        })
        return results
    }

    const filteredPagesCollection = (searchStrings: string[]) => {
        let results: ComponentPageList[] = []
        setSearchValuess(searchStrings)

        if (searchStrings.length == 0) {
            results = pages
            setOpenAllFolders(false)
        }
        else {
            pages.map((collection) => {
                let sectionPages: ComponentPage[] = []
                collection.components.map((page) => {
                    if (searchStrings.some(str => page.menuCaption.toLowerCase().includes(str.toLowerCase()))) {
                        sectionPages.push(page)
                    }
                })
                if (sectionPages.length > 0) {
                    results.push({
                        menuCaption: collection.menuCaption,
                        folderName: collection.folderName,
                        components: sectionPages
                    })
                }
            })
            setOpenAllFolders(true)
        }
        setPagesCollection(results)
        return results
    }

    const CollapsableList = ({ pages, folderName }: { pages: ComponentPage[], folderName: string }) => {
        return (
            <Collapse in={folderName == open || openAllFolders} timeout="auto" unmountOnExit>
                <List dense={dense} component="div" disablePadding>
                    {
                        pages.map((page, i) => (
                            <MenuListItem pageName={page.menuCaption} folderName={folderName} key={i} sx={{ pl: 4, color: "inherit" }} />
                        ))
                    }
                </List>
            </Collapse>
        )
    }

    const MenuSection = ({ collection }: { collection: ComponentPageList }) => {
        return (
            <>
                <ListItemButton onClick={() => handleClick(collection.folderName)}>
                    <ListItemText primary={collection.menuCaption} />
                    {collection.folderName == open || openAllFolders ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <CollapsableList pages={collection.components} folderName={collection.folderName} />
            </>
        )
    }

    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: "border-box",
            ...(!open && {
                overflowX: "hidden",
                transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up("sm")]: {
                    width: theme.spacing(4),
                },
            }),
        },
    }));

    return (
        <>
            <BrowserRouter>
                <Box id="mainBox" sx={{ display: "flex" }}>

                    <Drawer
                        variant="permanent"
                        open={isDrawerOpen}
                    >
                        {!isDrawerOpen &&
                            <>
                                <ArrowForwardIosIcon sx={{ mt: 2, mr: 'auto', ml: 'auto' }} onClick={() => setIsDrawerOpen(true)} />
                                <List dense={dense} sx={{ height: 'calc(100vh - 50px)' }}>
                                </List>
                            </>
                        }
                        {
                            isDrawerOpen &&
                            <>
                                <Autocomplete
                                    freeSolo={true}
                                    autoComplete={true}
                                    autoSelect={true}
                                    multiple={true}
                                    id="autocomplete-menu-list"
                                    size="small"
                                    options={filteredSearchResults()}
                                    sx={{ p: 0.5, pt: 1, mr: 3 }}
                                    renderInput={(params) => {
                                        return (
                                            <>
                                                <TextField
                                                    {...params}
                                                    label="Search examples"
                                                />
                                                <ArrowBackIosNewIcon sx={{ mt: 1 }} onClick={() => setIsDrawerOpen(false)} />
                                            </>

                                        )
                                    }}
                                    onChange={(event, value) => {
                                        filteredPagesCollection(value)
                                    }}
                                    value={searchValues}
                                />
                                <List dense={dense} sx={{ height: 'calc(100vh - 68px)' }}>
                                    <MenuListItemSimple pageName={'Home'} sx={{ pl: 0, color: "inherit" }} />
                                    {
                                        pagesCollection.map((collection, i) => {
                                            return (
                                                <MenuSection collection={collection} key={i} />
                                            )
                                        })
                                    }
                                </List>
                            </>
                        }

                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            //height: "100vh",
                            overflow: "auto",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        <AllRoutes />
                    </Box>
                </Box>

            </BrowserRouter >
        </>
    )
}

export default PageList

