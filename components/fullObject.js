import Link from "next/link";

export default function FullObject({props}){
    return (
        <div className='obj-card-full'>
            <div className='obj-card-full__wrapper'>
                <div className="obj-card_full_info">
                    <div className='obj-card__mail'>
                        <span className='email__text'>{props.email}</span>
                    </div>
                    <div className="obj-card__title">
                        <span className='name__text'>{props.name}</span>
                    </div>
                    <div className='obj-card__full text__center'>
                        <span className='full__text'>{props.body}</span>
                    </div>
                    <Link href={`/?page=${props.postId}`}><button className='obj-card__back back__full'><span className='button__text'>Назад</span></button></Link>
                </div>
            </div>
        </div>
    );
}