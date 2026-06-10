package com.backend_semi.controller;

import com.backend_semi.dto.NoticeRequestDto;
import com.backend_semi.dto.NoticeResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.backend_semi.service.NoticeService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    // 공지사항 등록
    // createNotice를 multipart로 수정
    // @RequestBody(JSON) → @RequestPart(파일 + 데이터)로 바꾸는 게 핵심
    // consumes 명시: multipart로 받음 (데이터 + 파일)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> createNotice(
            Authentication authentication,
            // 공지 데이터(JSON 문자열) — 프론트가 "data"라는 파트로 보냄
            @RequestPart("data") NoticeRequestDto request,
            // 첨부파일 — 없을 수도 있으니 required = false
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        String loginId = (String) authentication.getDetails();
        Long noticeId = noticeService.createNotice(loginId, request, file);
        return ResponseEntity.ok(noticeId);
    }

    // 전체 공지사항 조회
    @GetMapping
    public ResponseEntity<List<NoticeResponseDto>> getNoticeList(){
        List<NoticeResponseDto> notices = noticeService.getNoticeList();

        return ResponseEntity.ok(notices);
    }

    // 공지사항 단건 조회
    @GetMapping("/{noticeId}")
    public ResponseEntity<NoticeResponseDto> getNotice(@PathVariable Long noticeId){
        NoticeResponseDto notice = noticeService.getNotice(noticeId);

        return ResponseEntity.ok(notice);
    }

    // 카테고리별 공지사항 조회
    @GetMapping("/category/{noticeCateogryId}")
    public ResponseEntity<List<NoticeResponseDto>> getNoticeListByCategory(@PathVariable Long noticeCategoryId){
        List<NoticeResponseDto> notices = noticeService.getNoticeListByCategory(noticeCategoryId);

        return ResponseEntity.ok(notices);
    }

    // 작성자별 공지사항 조회
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<NoticeResponseDto>> getNoticeListByMember(@PathVariable Long memberId){
        List<NoticeResponseDto> notices = noticeService.getNoticeListByMember(memberId);

        return ResponseEntity.ok(notices);
    }

    // 공지사항 수정
    @PutMapping(value = "/{noticeId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateNotice(
            Authentication authentication,
            @PathVariable Long noticeId,
            @RequestPart("data") NoticeRequestDto request,
            @RequestPart(value = "file", required = false) MultipartFile file
    ){
        String loginId = (String) authentication.getDetails();
        noticeService.updateNotice(loginId, noticeId, request, file);
        return ResponseEntity.ok().build();
    }

    // 공지사항 삭제
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Void> deleteNotice(
            Authentication authentication,
            @PathVariable Long noticeId   ){
        String loginId = (String) authentication.getDetails();

        noticeService.deleteNotice(loginId, noticeId);

        return ResponseEntity.noContent().build();
    }
}
