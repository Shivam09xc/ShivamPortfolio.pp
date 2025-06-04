import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/config/site';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="glassmorphism-darker overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-primary/30 flex flex-col h-full">
      {article.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={article.dataAiHint || "blog article technology"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-headline text-primary">{article.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80">{article.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="text-accent hover:text-primary p-0">
          <Link href={`/blog/${article.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
