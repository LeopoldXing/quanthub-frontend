import Button from "@mui/material/Button";

const ArticleOverviewGridItem = ({ title, abstract, articleLink }: {
  title: string,
  abstract: string,
  articleLink: string
}) => {
  return (
      <div className="w-100px h-175px p-4 flex flex-col justify-between items-start text-left text-white">
        {/*  title  */}
        <div className="font-bold text-2xl">
          {title}
        </div>
        {/*  abstract  */}
        <div className="mt-8 leading-normal">
          {abstract}
        </div>
        {/*  read more  */}
        <div className="mt-8">
          <Button variant="text" onClick={() => window.location.href = articleLink} sx={{
            color: "#a3d5f7",
            '&:hover': {
              color: '#f0e68c'
            }
          }}>Read more</Button>
        </div>
      </div>
  );
};

export default ArticleOverviewGridItem;
