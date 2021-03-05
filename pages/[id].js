import Router, {useRouter} from "next/router";
import {useState, useEffect} from 'react';
import Head from "next/head";
import FullObject from "../components/fullObject";
import Loader from "../components/loader";

export default function Post(){
    const router = useRouter();

    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function load() {
            const responce = await fetch(`https://jsonplaceholder.typicode.com/comments/${router.query.id}`);
            const json = await responce.json();
            setPost(json);
            setLoading(false);
        }
        load();
    }, []);


    return (
        <div>
            <Head>
                <title>Информация</title>
            </Head>
            {
                loading ? <Loader/> : <FullObject props={post}/>
            }
        </div>
    );
}