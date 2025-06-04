import { siteConfig, Article } from '@/config/site';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return siteConfig.articles.map((article) => ({
    slug: article.slug,
  }));
}

const getArticle = (slug: string): Article | undefined => {
  return siteConfig.articles.find((article) => article.slug === slug);
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = getArticle(params.slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center items-center pt-24 md:pt-32">
        <h1 className="text-4xl font-bold text-primary mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, the article you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/#blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 pt-24 md:pt-32">
      <article>
        <Card className="glassmorphism-darker">
          {article.imageUrl && (
            <div className="relative w-full h-64 md:h-96 rounded-t-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={article.dataAiHint || "blog header image"}
              />
            </div>
          )}
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline text-primary">{article.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Published on {new Date(article.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert prose-lg max-w-none mx-auto text-foreground/90">
            {/* Placeholder content for the blog post body */}
            <p>{article.excerpt}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
             <Button asChild variant="link" className="mt-8 p-0 text-accent hover:text-primary">
                <Link href="/#blog">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
            </Button>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const article = getArticle(params.slug);
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }
  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.excerpt,
  };
}
