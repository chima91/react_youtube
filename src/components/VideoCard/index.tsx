import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";

import useStyles from "./style";
import { HeaderTitle } from "./HeaderTitle";
import { SubHeaderContent } from "./SubHeaderContent";

export const VideoCard = () => {
  const styles = useStyles();

  return (
    // elevation={0} : Cardの影を削除する
    // square : 丸みの除去
    <Card className={styles.root} elevation={0} square>
      <CardMedia
        className={styles.media}
        image="/static/no-image.jpg"
        title="Thumbnail"
      />

      <CardHeader
      className={styles.header}
        avatar={<Avatar />}
        title={<HeaderTitle />}
        subheader={<SubHeaderContent />}
      />
    </Card>
  );
};