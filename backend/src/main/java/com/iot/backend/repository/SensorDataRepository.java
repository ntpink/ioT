package com.iot.backend.repository;

import com.iot.backend.entity.SensorData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, Long> {

    // Lấy bản ghi mới nhất theo ID giảm dần (luôn đảm bảo lấy bản ghi vừa insert)
    Optional<SensorData> findTopByOrderByIdDesc();
    Optional<SensorData> findTopByOrderByCreatedAtDesc();

    // Lấy N bản ghi gần nhất cho biểu đồ
    List<SensorData> findTop6ByOrderByIdDesc();
    List<SensorData> findTop6ByOrderByCreatedAtDesc();
    List<SensorData> findTop10ByOrderByCreatedAtDesc();

    // Lọc theo thời gian linh hoạt (Hỗ trợ tìm kiếm khi xóa ngày, xóa giây, xóa tháng, hoặc nhiều từ khóa)
    @Query(value = "SELECT * FROM sensor_data s WHERE " +
           "(:part1 = '' OR " +
           "DATE_FORMAT(s.created_at, '%Y-%m-%d %H:%i:%s') LIKE CONCAT('%', REPLACE(:part1, '/', '-'), '%') OR " +
           "DATE_FORMAT(s.created_at, '%d/%m/%Y %H:%i:%s') LIKE CONCAT('%', :part1, '%') OR " +
           "DATE_FORMAT(s.created_at, '%H:%i:%s') LIKE CONCAT('%', :part1, '%')) AND " +
           "(:part2 = '' OR " +
           "DATE_FORMAT(s.created_at, '%Y-%m-%d %H:%i:%s') LIKE CONCAT('%', REPLACE(:part2, '/', '-'), '%') OR " +
           "DATE_FORMAT(s.created_at, '%H:%i:%s') LIKE CONCAT('%', :part2, '%')) " +
           "ORDER BY s.created_at DESC",
           countQuery = "SELECT count(*) FROM sensor_data s WHERE " +
           "(:part1 = '' OR " +
           "DATE_FORMAT(s.created_at, '%Y-%m-%d %H:%i:%s') LIKE CONCAT('%', REPLACE(:part1, '/', '-'), '%') OR " +
           "DATE_FORMAT(s.created_at, '%d/%m/%Y %H:%i:%s') LIKE CONCAT('%', :part1, '%') OR " +
           "DATE_FORMAT(s.created_at, '%H:%i:%s') LIKE CONCAT('%', :part1, '%')) AND " +
           "(:part2 = '' OR " +
           "DATE_FORMAT(s.created_at, '%Y-%m-%d %H:%i:%s') LIKE CONCAT('%', REPLACE(:part2, '/', '-'), '%') OR " +
           "DATE_FORMAT(s.created_at, '%H:%i:%s') LIKE CONCAT('%', :part2, '%'))",
           nativeQuery = true)
    Page<SensorData> searchSensorsFlexible(@Param("part1") String part1, @Param("part2") String part2, Pageable pageable);
}
