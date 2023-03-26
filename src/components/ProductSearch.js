import ProductItem from '../components/ProductItem'
import { useState } from 'react'
import {
    IonCard,
    IonIcon,
    IonCardContent,
    IonSearchbar,
    IonList,
    IonProgressBar,
    IonButton,
} from '@ionic/react'
import { close } from 'ionicons/icons'

import './ProductSearch.css'

function ProductSearch() {
    const [products, setProducts] = useState([])
    const [spinnerShow, setSpinnerShow] = useState(false)
    const [resultChips, setResultChips] = useState('')

    let alertChips

    const handleEnter = event => {
        if (event.key === 'Enter') {
            setSpinnerShow(true)
            const inputValue = event.target.value

            // cors fix
            fetch(
                `https://de.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${inputValue}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        alert('HTTP-Error: ' + response.status)
                    }
                })
                .then(response => {
                    setProducts(response.products)
                    console.log(response.products)
                    setSpinnerShow(false)
                    if (response.products.length === 0) {
                        setResultChips('empty')
                    } else setResultChips('full')
                })
        }
    }

    //list results
    const productResults = products.map((product, index) => {
        return <ProductItem product={product} key={index} />
    })

    if (resultChips === 'full') {
        alertChips = (
            <IonCard className='chipWarning'>
                <IonCardContent>
                    <strong>Warning</strong> There is always a possibility that
                    data about allergens may be missing, incomplete, incorrect
                    or that the product's composition has changed. If you are
                    allergic, always check the information on the actual product
                    packaging.
                </IonCardContent>
                <IonButton
                    className='closeButton'
                    fill='clear'
                    onClick={() => setResultChips('')}
                >
                    <IonIcon aria-hidden='true' icon={close} />
                </IonButton>
            </IonCard>
        )
    } else if (resultChips === 'empty') {
        alertChips = (
            <IonCard className='chipError'>
                <IonCardContent>
                    <strong>
                        No results for your search, try another keyword
                    </strong>
                </IonCardContent>
                <IonButton
                    className='closeButton'
                    fill='clear'
                    onClick={() => setResultChips('')}
                >
                    <IonIcon aria-hidden='true' icon={close} />
                </IonButton>{' '}
            </IonCard>
        )
    }

    return (
        <>
            <IonSearchbar
                animated={true}
                showCancelButton='focus'
                placeholder='Search'
                inputMode='search'
                onKeyDown={handleEnter}
            ></IonSearchbar>
            <IonList id='productList'>
                {spinnerShow ? (
                    <IonProgressBar type='indeterminate'></IonProgressBar>
                ) : null}
                {alertChips}
                {productResults}
            </IonList>
        </>
    )
}

export default ProductSearch

// future improvements: according to user input in search:
// if number search codebar
// if string search general
