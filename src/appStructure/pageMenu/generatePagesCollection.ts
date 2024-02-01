import { ComponentPageList } from "../menuTypes";
import sectionList from "../../listOfPageSections";

const pages: ComponentPageList[] =
    sectionList.map((section: ComponentPageList) => {
        return (
            { menuCaption: section.menuCaption, folderName: section.folderName, components: section.components }
        )
    })

export default pages