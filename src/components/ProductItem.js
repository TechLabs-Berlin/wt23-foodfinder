import { IonButton, IonItem, IonLabel, IonThumbnail } from '@ionic/react'
import { Icon } from '@iconify/react'
import useMyProductsContext from '../hooks/use-products-context'
import { useState, useEffect } from 'react'
import './ProductItem.css'

function ProductItem({ product, onClick }) {
    // importing favs and handling click
    const { addFav, deleteFav, favorites } = useMyProductsContext()
    const [starIcon, setStarIcon] = useState('ic:round-star-outline')

    useEffect(() => {
        if (favorites.some(favorite => favorite.id === product.id)) {
            setStarIcon('ic:round-star')
        }
    }, [favorites, product.id])

    const handleFav = event => {
        event.stopPropagation()
        event.preventDefault()
        if (favorites.includes(product)) {
            setStarIcon('ic:round-star-outline')
            deleteFav(product)
        } else {
            setStarIcon('ic:round-star')
            addFav(product)
        }
    }

    // categories
    let glutenFree
    let gluten
    let vegetarian
    let vegan
    let allergen
    let warning

    if (product.labels_tags && product.labels_tags.length > 0) {
        glutenFree = product.labels_tags.includes('en:no-gluten') ? (
            <Icon icon='mdi:gluten-free' color='#5bd6b7' />
        ) : null
        gluten = !product.labels_tags.includes('en:no-gluten') ? (
            <Icon icon='mdi:gluten' color='#D65B79' />
        ) : null
        vegetarian = product.labels_tags.includes('en:vegetarian') ? (
            <Icon icon='lucide:leaf' color='#5bd6b7' />
        ) : null
        vegan = product.labels_tags.includes('en:vegan') ? (
            <Icon icon='lucide:vegan' color='#5bd6b7' />
        ) : null
        allergen =
            product.allergens.length > 0 ? (
                <Icon icon='lucide:info' color='#D65B79' />
            ) : null
    } else {
        warning = <Icon icon='lucide:info' color='#F2C600' />
    }

    return (
        <IonItem
            href='#'
            routerLink={`/selectedProduct/${product.id}/${product.product_name}/${product.brands}`}
            routerDirection='forward'
        >
            {/* STAR Button/Icon */}
            <IonButton
                className='favoriteStar'
                href='#'
                slot='start'
                onClick={handleFav}
                fill='clear'
            >
                <Icon icon={starIcon} color='#eee114' width='28' />
            </IonButton>

            {/*thumbnail image*/}

            <IonThumbnail slot='start'>
                <img
                    alt={product.product_name}
                    // src={product.image_front_thumb_url}
                    src={
                        product.image_front_small_url ||
                        'https://static.thenounproject.com/png/3674270-200.png'
                    }
                />
            </IonThumbnail>

            {/* Information */}
            <IonLabel>
                <h3>{product.product_name}</h3>
                <p>Brand:{product.brands}</p>
                {gluten}
                {glutenFree}
                {vegetarian}
                {vegan}
                {allergen}
                {warning}
            </IonLabel>
        </IonItem>
    )
}

export default ProductItem
