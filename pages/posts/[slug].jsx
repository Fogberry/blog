import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Postbody from "../../components/post-body";
import { getPostBySlug, getAllPosts } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.scss";

import Head from "next/head";
import Link from "next/link";

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className={utilStyles.headingh1}>{post.title}</h1>
      <div className={utilStyles.flexBox}>
        <div>Date:{post.date.replace(/^<(.*)>$/, "$1")}</div>
        <div>
          Category:
          <Link href="/archives">{post.category}</Link>
        </div>
        <div>Tags:{post.tags}</div>
      </div>

      <div className={utilStyles.context}>
        <Postbody content={post.content} />
      </div>
    </Layout>
  );
}
// TODO Add Creative Commons,Comment
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "category",
    "tags",
    "content",
  ]);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
