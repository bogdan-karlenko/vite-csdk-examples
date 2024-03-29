import { ReactNode } from 'react';

import Container from '@mui/material/Container';

type ContentPropsType = {
    childComponent?: ReactNode
}

const ContentPage = (ContentProps: ContentPropsType) => {
    return (
        <Container maxWidth="xl" sx={{ mt: 0, mb: 0 }}>
            {ContentProps.childComponent}
        </Container>
    )
}

export default ContentPage