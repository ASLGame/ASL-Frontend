import { FunctionComponent } from "react";
import styles from "./About.module.css";

const About: FunctionComponent = () => {
  return (
    <div className={styles.container + " " + styles.backgroundImage}>
      <div className={styles.titleBackground}>
        <h1 className={styles.title}>About Signy...</h1>
      </div>
      <div className={styles.textContainer}>
        <p>
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
          Rights of Person with Disabilities calls on states to accept,
          facilitate, and promote the use of sign language with the goal to
          ensure that people with disabilities can enjoy their rights on an
          equal basis with others.
        </p>
      </div>
    </div>
  );
};

export default About;
