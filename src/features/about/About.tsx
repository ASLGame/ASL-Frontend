import { FunctionComponent } from "react";
import styles from "./About.module.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageTitle from "../../components/PageTitle/Title";
import { useMediaQuery } from "@mui/material";

const About: FunctionComponent = () => {
  const isDesktop = useMediaQuery("(min-width:1660px)");

  return (
    // Container for the About page with specified styles from css file
    <Grid className={styles.container + " " + styles.backgroundImage}>
      {/* Page title component with the label "About Us" */}
      <PageTitle label={"About Us"} />
      {/* Container for text content with specific styles from css file */}
      <Grid className={styles.textContainer}>
        <Typography variant={isDesktop ? "h5" : "h6"}>
          {/* Text content  */}
          According to the World Health Organization (WHO), over 5% of the
          world's population -or 430 million people - require rehabilitation to
          address their hearing loss. It Is also projected that by 2050 nearly
          2.5 billion people will have some degree of hearing loss and at least
          700 million will require hearing rehabilitation. The most common way
          for the hearing impaired to communicate is by using sign language. In
          addition to this community, sign language is used by people with other
          disabilities, including autism, apraxia of speech, cerebral palsy, and
          down syndrome. The most commonly used signed language is American Sign
          Language (ASL). Over half a million people in the United States use
          ASL as primary communication. The United Nations Convention on the
          Rights of Persons with Disabilities calls on states to accept,
          facilitate, and promote the use of sign language with the goal to
          ensure that people with disabilities can enjoy their rights on an
          equal basis with others.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
