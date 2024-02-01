import './appStructure/App.css'

import { SisenseContextProvider, ThemeProvider } from "@sisense/sdk-ui";
import PageList from './appStructure/pageMenu/Menu'

function App() {

  const url: string = import.meta.env.VITE_APP_SISENSE_URL ?? '';
  const token: string = import.meta.env.VITE_APP_SISENSE_TOKEN;

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
