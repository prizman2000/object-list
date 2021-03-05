import Link from 'next/link'

export function BasicObject ({props}){
    return (
        <div className='obj-card'>
            <div className="obj-card__info">
                <div className='obj-card__mail'>
                    <span className='email__text'>{props.email}</span>
                </div>
                <div className="obj-card__title">
                    <span className='name__text'>{props.name}</span>
                </div>
                <Link href={`/${props.id}`}><button className='obj-card__back'><span className='button__text'>Подробнее</span></button></Link>
            </div>
        </div>
    );
}