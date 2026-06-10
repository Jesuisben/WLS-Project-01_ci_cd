import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { LECTURE_LANGUAGE_OPTIONS } from "../../constants/lectureForm";
import type { LectureFormErrors, LectureFormValue } from "../../types/LectureForm";

type LectureEditorFormProps = {
  title: string;
  lecture: LectureFormValue;
  errors: LectureFormErrors;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFieldChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
};

function LectureEditorForm({
  title,
  lecture,
  errors,
  categories,
  selectedCategory,
  onCategoryChange,
  onFieldChange,
  onSubmit,
}: LectureEditorFormProps) {
  return (
    <Container style={{ marginTop: "90px" }}>
      <h1>{title}</h1>

      {errors.general && <Alert variant="danger">{errors.general}</Alert>}

      {/* Bootstrap Form은 submit 이벤트를 한 곳에서 모아 처리한다. */}
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formCategory">
          <Form.Label column sm={2}>
            대주제
          </Form.Label>

          <Col sm={10}>
            {/* 기존 대주제를 고르거나, 없으면 직접 입력으로 새 카테고리를 만든다. */}
            <Form.Select
              value={selectedCategory}
              onChange={onCategoryChange}
              isInvalid={!!errors.category}
              className="mb-2"
            >
              <option value="">대주제를 선택해 주세요.</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}

              <option value="custom">직접 입력</option>
            </Form.Select>

            {selectedCategory === "custom" && (
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="새로운 대주제를 입력해 주세요."
                name="category"
                value={lecture.category}
                onChange={onFieldChange}
                isInvalid={!!errors.category}
              />
            )}

            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            파일 이름
          </Form.Label>

          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="파일 이름을 입력해 주세요."
              name="name"
              value={lecture.name}
              onChange={onFieldChange}
              isInvalid={!!errors.name}
            />

            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formlecture_description"
        >
          <Form.Label column sm={2}>
            강의 설명
          </Form.Label>

          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="강의 설명를 입력해 주세요."
              name="lecture_description"
              value={lecture.lecture_description}
              onChange={onFieldChange}
              isInvalid={!!errors.lecture_description}
            />

            <Form.Control.Feedback type="invalid">
              {errors.lecture_description}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formCode_example">
          <Form.Label column sm={2}>
            코드 예시
          </Form.Label>

          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="코드 예시를 입력해 주세요."
              name="code_example"
              value={lecture.code_example}
              onChange={onFieldChange}
              isInvalid={!!errors.code_example}
            />

            <Form.Control.Feedback type="invalid">
              {errors.code_example}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formCode_description">
          <Form.Label column sm={2}>
            코드 설명
          </Form.Label>

          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="코드 설명을 입력해 주세요."
              name="code_description"
              value={lecture.code_description}
              onChange={onFieldChange}
              isInvalid={!!errors.code_description}
            />

            <Form.Control.Feedback type="invalid">
              {errors.code_description}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formLanguage">
          <Form.Label column sm={2}>
            언어
          </Form.Label>

          <Col sm={10}>
            <Form.Select
              name="language"
              value={lecture.language}
              onChange={onFieldChange}
              isInvalid={!!errors.language}
            >
              <option value="-">언어 카테고리를 선택해 주세요.</option>

              {LECTURE_LANGUAGE_OPTIONS.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.language}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" size="lg">
          {title}
        </Button>
      </Form>
    </Container>
  );
}

export default LectureEditorForm;
