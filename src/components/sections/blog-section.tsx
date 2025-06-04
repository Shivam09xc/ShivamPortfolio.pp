import { siteConfig } from '@/config/site';
import ArticleCard from '@/components/shared/article-card';
import SectionWrapper from '@/components/shared/section-wrapper';

export default function BlogSection() {
  return (
    <SectionWrapper id="blog" title="Latest Articles">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteConfig.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </SectionWrapper>
  );
}
