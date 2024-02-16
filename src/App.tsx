import './appStructure/App.css'

import { SisenseContextProvider, ThemeProvider } from "@sisense/sdk-ui";
import PageList from './appStructure/pageMenu/Menu'

function App() {

  const url: string = import.meta.env.VITE_APP_SISENSE_URL ?? '';
  const token: string = import.meta.env.VITE_APP_SISENSE_TOKEN;

  // const url: string = "https://public-compose-sdk.sisense.com/"
  // const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjVjMGU0MzFjMzEzNzUwMDJkYjU2NzQ0IiwiYXBpU2VjcmV0IjoiYTFlZjIzNzQtMDM2ZC02Y2ZhLWIwYzMtMTRkNWQ3MDg2NjI1IiwiYWxsb3dlZFRlbmFudHMiOlsiNjRkNGY0Y2E0ZTRlNmYwMDFiMzRlODQwIl0sInRlbmFudElkIjoiNjRkNGY0Y2E0ZTRlNmYwMDFiMzRlODQwIn0.rEL07K32QHRKeHkYy-0ezJB-TZ5Uh027qFtW0eIDNec"

  return (
    <>
      <SisenseContextProvider url={url} token={token}>
        <ThemeProvider
          theme={{
            typography: {
              fontFamily: 'Verdana'
            },
            palette: {
              variantColors: ['#4361ee', '#f72585', '#7209b7', '#4cc9f0', '#3a0ca3',]
            },
            general: {
              brandColor: '#FFB9D7'
            }
          }
          }>

          <PageList />

        </ThemeProvider>
      </SisenseContextProvider>

    </>
  )
}

export default App
